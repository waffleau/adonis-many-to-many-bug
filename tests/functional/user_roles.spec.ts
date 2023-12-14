import { test } from "@japa/runner";

import Role from "App/Models/Role";
import User from "App/Models/User";

test("can load roles for a user", async ({ assert }) => {
  const user = await User.create({ name: "User" });
  const role = await user.related("roles").create({ name: "Role" });

  await user.refresh();
  await user.load("roles");

  assert.lengthOf(user.roles, 1);
  assert.equal(user.roles[0].id, role.id);
});

test("can preload roles for a user", async ({ assert }) => {
  const user = await User.create({ name: "User" });
  const role = await user.related("roles").create({ name: "Role" });

  const user2 = await User.query()
    .where("id", user.id)
    .preload("roles")
    .firstOrFail();

  assert.lengthOf(user2.roles, 1);
  assert.equal(user2.roles[0].id, role.id);
});

test("can attach roles to a user", async ({ assert }) => {
  const role = await Role.create({ name: "Role" });
  const user = await User.create({ name: "User" });

  await user.related("roles").attach([role.id]);
  await user.load("roles");

  assert.lengthOf(user.roles, 1);
  assert.equal(user.roles[0].id, role.id);
});

test("can sync roles with a user", async ({ assert }) => {
  const role = await Role.create({ name: "Role" });
  const user = await User.create({ name: "User" });

  await user.related("roles").sync([role.id]);
  await user.load("roles");

  assert.lengthOf(user.roles, 1);
  assert.equal(user.roles[0].id, role.id);
});
