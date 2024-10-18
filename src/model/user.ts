import { Entity, Repository } from './entity'

export class Pair<X, Y> {
  private readonly x: X
  private readonly y: Y

  constructor(x: X, y: Y) {
    this.x = x
    this.y = y
  }

  get getX(): X {
    return this.x
  }

  get getY(): Y {
    return this.y
  }
}

export class User implements Entity<UserId, Pair<string, string>> {
  id: UserId
  value: Pair<string, string>

  constructor(id: UserId, name: string, surname: string) {
    this.id = id
    this.value = new Pair(name, surname)
  }
}

export class UserId {
  email: string

  constructor(email: string) {
    this.email = email
  }
}

export class UserRepository extends Repository<User> {}
