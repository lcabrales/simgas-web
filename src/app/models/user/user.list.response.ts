import { User } from './user.model';
import { Result } from '../result';

export interface UserListResponse {
    Data: User[];
    Result: Result;
}