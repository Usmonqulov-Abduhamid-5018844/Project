import { SetMetadata } from "@nestjs/common"
import { Role } from "../user/dto/create-user.dto"

export const Roles = (...role: Role[]) => SetMetadata("role", role)