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
  })

  afterAll(() => {
    app.close()
  })

  describe("Auth", () => {
    describe("signup", () => {
      it('should signup', () => {
        const dto: AuthDto = {
          email: 'yaw@mailinator.com',
          name: 'Yaw Kyei',
          password: "password"
        }
        return pactum.spec().post('http://localhost:3333/auth/register').withBody(dto).expectStatus(201)
      })
    })

    describe("login", () => {
    })
  })

  describe("User", () => {
  })

  describe("Employee", () => {
  })
})