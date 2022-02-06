import { Injectable } from '@nestjs/common';
import { UserCreateDto } from 'tools/dtos/user.dto';
import { UserModel } from 'tools/models/user.model';

const result: UserModel[] = []
@Injectable()
export class UserService {
    getlAllUsers(): UserModel[] {
        if (result.length === 0) {
            this.creatingMockUser({
                birthDay: new Date(),
                email: 'ahmetaydin@udemy.com.tr',
                name: 'Ahmet',
                surname: 'Aydın',
                password: '123123',
            });
        }
        return result;
    }

    createUser(body: UserCreateDto) {
        const isExist = result.find(res => {
            res.email === body.email;
        });
        if (isExist) {
            return isExist;
        } else {
            this.creatingMockUser(body);
            return result.slice(result.length - 1, result.length);
        }
    }

    private creatingMockUser(data: any) {
        const user: UserModel = new UserModel();

        user.birthDay = data.birthDay;
        user.email = data.email;
        user.name = data.name;
        user.surname = data.surname;
        user.password = data.password;

        result.push(user)

    }
}
