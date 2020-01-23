import { IsString, IsNumber, IsEnum } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { CatStatusEnum } from './cat.enum'

export class CreateCatInput {
  @IsString()
  @ApiProperty({
    description: 'The name of a cat',
    default: 'Meaw',
  })
  readonly name: string

  @IsNumber()
  @ApiProperty({
    description: 'The age of a cat',
    default: 1,
  })
  readonly age: number

  @IsString()
  @ApiPropertyOptional({
    description: 'The breed of a cat',
    default: 'baan',
  })
  readonly breed: string

  @IsEnum(CatStatusEnum)
  @ApiPropertyOptional({ enum: CatStatusEnum, default: CatStatusEnum.ACTIVE })
  public status: string
}
