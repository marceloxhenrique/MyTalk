import { UserRepositoryInterface } from "../../domain/user/User.repository";

export default class DeleteAcount {
  constructor(private userRepository: UserRepositoryInterface) {}
  async execute(userId: string): Promise<void> {
    this.userRepository.deleteAccount(userId);
  }
}
