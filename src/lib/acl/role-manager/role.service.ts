import { Service } from "../../../interfaces/IService";
import { RoleDto } from "./role.dto";
import RoleModel, { Role } from "./role.model";
import { RoleRepository } from "./role.repository";

export class RoleService extends Service<RoleDto> {

  constructor() {
    super(new RoleRepository(RoleModel))
  }

}
