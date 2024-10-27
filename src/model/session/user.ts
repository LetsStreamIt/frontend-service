import { Entity } from './entity'

/**
 * User
 */
export class User extends Entity<UserId, string> {
  get getUsername(): string {
    return this.value
  }
}

/**
 * User Id
 */
export class UserId {
  private readonly email: string

  constructor(email: string) {
    this.email = email
  }

  get getEmail(): string {
    return this.email
  }
}