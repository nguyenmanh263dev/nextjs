import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  Length,
  Validate,
} from 'class-validator';
import { PasswordConfirmValidator } from '../../../src/validators/password-confirm.validator';

export class UpdateUserDto {
  @IsOptional()
  firstName: string;

  @IsOptional()
  lastName: string;

  @IsOptional()
  @IsNotEmpty()
  @Length(8, 24)
  password: string;

  @IsOptional()
  @IsNotEmpty()
  @Validate(PasswordConfirmValidator, ['password'])
  passwordConfirmation: string;

  @IsOptional()
  @IsBoolean()
  isActive: boolean;
}
