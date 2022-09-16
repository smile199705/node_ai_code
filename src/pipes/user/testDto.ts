import { IsString, IsInt, IsNumber, Equals, IsEnum, isEnum } from 'class-validator'

export class TestDto {
    // @IsString({ message: '名字' })
    // readonly name: string

    @IsEnum(['23', '98' ])
    readonly age: number
}
