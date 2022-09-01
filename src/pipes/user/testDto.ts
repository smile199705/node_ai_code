import { IsString, IsInt, IsNumber, Equals, IsEnum } from 'class-validator'

export class TestDto {
    @IsString({ message: '名字' })
    readonly name: string

    @IsInt({ message: '年龄' })
    readonly age: number
}
