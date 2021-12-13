import { db } from "./db.server";

const findUser = async (id: string) => {
  const foundUser = await db.user.findFirst({
    where: {
      id,
    },
  });

  return foundUser;
};

const createUser = async (id: string) => {
  const createdUser = await db.user.create({
    data: {
      id,
    },
  });

  return createdUser;
};

export const findOrCreateUser = async (id: string) => {
  const foundUser = await findUser(id);

  if (foundUser) {
    return foundUser;
  }

  const createdUser = await createUser(id);
  return createdUser;
};
