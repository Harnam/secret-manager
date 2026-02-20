import { hashPassword } from "./crypto";

export const LoginOrSignUp = async (user: UserLogin): Promise<{status: string, user?: User, error?: string}> => {
    return new Promise((resolve, reject) => {
            const storedUser = localStorage.getItem("user" + user.id) || null;
            console.log("Stored user:", storedUser);
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser) as User;
                hashPassword(user.password, parsedUser.salt).then(({ hash }) => {
                    if (parsedUser.hash !== hash) {
                        reject({ status: "error", error: "Incorrect password" });
                    } else {
                        resolve({ status: "success", user: parsedUser });
                    }
                });
            } else {
                hashPassword(user.password).then(({ hash, salt }) => {
                    const newUser: User = {
                        id: user.id,
                        hash,
                        salt
                    };
                    localStorage.setItem("user" + user.id, JSON.stringify(newUser));
                    resolve({ status: "success", user: newUser });
                });
            }
        });
}
