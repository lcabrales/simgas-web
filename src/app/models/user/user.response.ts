import { User } from './user.model';
import { Result } from '../result';

export interface UserResponse {
    user: User;
    result: Result;
}