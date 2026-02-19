export const LoginOrSignUp = async (user: User): Promise<{status: string, user?: User, error?: string}> => {
    return new Promise((resolve, reject) => {
            const storedUser = localStorage.getItem("user" + user.id);
            if (storedUser) {
                if (JSON.parse(storedUser).password !== user.password) {
                    reject({ status: "error", error: "Incorrect password" });
                } else
                    resolve({ status: "success", user: JSON.parse(storedUser) as User });
            } else {
                localStorage.setItem("user" + user.id, JSON.stringify(user));
                resolve({ status: "success", user });
            }
        });
}

//implement hashing