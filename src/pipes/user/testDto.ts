import { IsString, IsInt, IsNumber } from 'class-validator'

export class TestDto {
    @IsString({ message: '名字' })
    readonly name: string

    @IsInt({ message: '年龄' })
    readonly age: number
}
