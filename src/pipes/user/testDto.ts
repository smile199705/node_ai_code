import { IsString, IsInt, IsNumber, Equals, IsEnum } from 'class-validator'

export class TestDto {
    @IsString({ message: '名字' })
    readonly name: string

    @IsNumber()
    readonly age: number
}
