import { IsNotEmpty, IsString } from 'class-validator'

export class createProductDto {
  @IsString()
  @IsNotEmpty()
  public name!: string
  @IsNotEmpty()
  public description!: string
}
