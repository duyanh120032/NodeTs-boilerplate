import { IsNumber, IsString } from 'class-validator'

export class PaginationDto {
  @IsNumber()
  public page?: number = 1
  @IsNumber()
  public limit?: number = 10

  @IsString()
  public sort?: string

  @IsString()
  public order?: string

  @IsString()
  public search?: string
}
