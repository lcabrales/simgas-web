import { User } from './user.model';
import { Result } from '../result';

export interface UserResponse {
    Data: User;
    Result: Result;
}