import bcrypt from "bcryptjs";
import mongoose, { Schema } from "mongoose";

import { ACCOUNT_TYPES } from "../business/account/types";
import {
  AccountFree,
  AccountPremium,
  AccountTop
} from "../business/account/validation";

const UsuarioSchema = new Schema({
  name: String,
  email: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  config: {},
  completeProfile: Boolean,
  accountType: {
    type: String,
    enum: [
      ACCOUNT_TYPES.free.name,
      ACCOUNT_TYPES.premium.name,
      ACCOUNT_TYPES.top.name
    ],
    required: [true, "Tipo de Conta é obrigatório"]
  }
});

class UsuarioClass {
  // `fullName` becomes a virtual
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  getCountTopics() {
    return this.topics.length || 0;
  }

  getAccount() {
    switch (this.accountType) {
      case ACCOUNT_TYPES.free.name:
        return new AccountFree(this);
      case ACCOUNT_TYPES.premium.name:
        return new AccountPremium(this);
      case ACCOUNT_TYPES.top.name:
        return new AccountTop(this);
    }
  }

  canAddTopic() {
    return this.getAccount().canAdd();
  }

  setConfig(key, value) {
    this.config[key] = value;

    return this.save();
  }

  getConfig(key) {
    return this.config[key] || null;
  }

  async addFavorite(id) {
    this.saved.push({
      reference: id,
      data: new Date()
    });
    await this.save();
    return this.saved;
  }

  async removeFavorite(_reference) {
    let index = this.saved.findIndex(({ reference }) => {
      return reference == _reference;
    });

    if (index > -1) {
      this.saved.splice(index, 1);
      this.markModified("saved");
    }
    await this.save();
    return this.saved;
  }

  static async createNewUser({ password, ...data }) {
    const hashedPassword = bcrypt.hashSync(password, 8);
    const usuario = await this.create({
      ...data,
      password: hashedPassword,
      accountType: ACCOUNT_TYPES.free.name
    });
    return usuario;
  }

  static async findUserWithRolesAuthenticate(email, password) {
    const usuario = await this.findOne({
      email
    });

    if (!usuario) {
      throw "Usuario não encontrado";
    }

    if (!!usuario && bcrypt.compareSync(password, usuario.password)) {
      return usuario.toObject();
    } else {
      throw "E-mail ou senha estão incorretos";
    }
  }
}

UsuarioSchema.loadClass(UsuarioClass);
export default mongoose.model("Usuario", UsuarioSchema, "usuarios");
