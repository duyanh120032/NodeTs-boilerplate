import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class authDto {
  @IsEmail()
  @IsNotEmpty()
  public email!: string

  @IsNotEmpty()
  @IsString()
  public password!: string
}
