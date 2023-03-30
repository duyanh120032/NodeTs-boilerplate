import { IsNotEmpty, IsString } from 'class-validator'
import { PaginationDto } from '~/dtos/pagination.dto'

export class createProductDto {
  @IsString()
  @IsNotEmpty()
  public name!: string
  @IsNotEmpty()
  public description!: string
}
