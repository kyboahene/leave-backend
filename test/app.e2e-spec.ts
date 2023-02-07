import * as pactum from 'pactum'
import { Test } from "@nestjs/testing"
import { INestApplication, ValidationPipe } from "@nestjs/common"

import { AuthDto } from "../src/auth/dto"
import { AppModule } from "../src/app.module"
import { PrismaService } from "../src/prisma/prisma.service"

describe('App e2e', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleRef.createNestApplication()
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true
    }))

    await app.init()
    await app.listen(3333)

    prisma = app.get(PrismaService)
    await prisma.cleanDB()

    pactum.request.setBaseUrl('http://localhost:3333')
  })

  afterAll(() => {
    app.close()
  })

  describe("Auth", () => {
    const dto: AuthDto = {
      email: 'yaw@mailinator.com',
      name: 'Yaw Kyei',
      password: "password"
    }

    describe("signup", () => {
      it('should throw error if email is empty', () => {
        return pactum.spec().post('/auth/register').withBody({ password: dto.password }).expectStatus(400)
      })

      it('should throw error if password is empty', () => {
        return pactum.spec().post('/auth/register').withBody({ email: dto.password }).expectStatus(400)
      })

      it('should signup', () => {
        return pactum.spec().post('/auth/register').withBody(dto).expectStatus(201)
      })
    })

    describe("login", () => {
      it('should login', () => {
        return pactum.spec().post('/auth/login').withBody(dto).expectStatus(200)
      })
    })
  })

  describe("User", () => {
  })

  describe("Employee", () => {
  })
})