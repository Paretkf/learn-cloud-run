import { Controller, Get, Post, Body, Param } from '@nestjs/common'
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger'
import { CatService } from './cat.service'
import { CreateCatInput } from './cat.dto'
import { CatLogic } from './cat.logic'
import { CatStatusEnum } from './cat.enum'

@ApiTags('cats')
@Controller('cats')
export class CatController {
  constructor(
    private readonly catService: CatService,
    private readonly catLogic: CatLogic
  ) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Cat data'
  })
  getAllCats(): any {
    return this.catService.findAll()
  }

  private readonly catMockData = {
    name: 'cofen cofen',
    age: 10,
    breed: 'wat',
    status: CatStatusEnum.ACTIVE
  }

  @Post()
  @ApiBody({ type: CreateCatInput })
  createCats (@Body() catDto: CreateCatInput) {
    return this.catLogic.createCatLogic(catDto)
  }

  @Get('/increment-cat-v1/:catId/:amount')
  testTransactionV1(@Param('catId') catId: string, @Param('amount') amount: number) {
    return this.catLogic.incrementCatV1(catId, amount)
  }

  @Get('/increment-cat-v2/:catId/:amount')
  testTransactionV2(@Param('catId') catId: string, @Param('amount') amount: number) {
    return this.catLogic.incrementCatV2(catId, amount)
  }
}
