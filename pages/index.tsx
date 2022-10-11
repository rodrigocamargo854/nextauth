import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContexts";
import styles from "../styles/Home.module.css";
import { withSSRguest } from "../utils/withSSRguest";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useContext(AuthContext);

  async function handSubmit(event: FormEvent) {
    event.preventDefault();

    const data = {
      email,
      password,
    };
    console.log(data);
    await signIn(data);
  }

  return (
    <form onSubmit={handSubmit} className={styles.container}>
      <input
        type={"email"}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type={"password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit"> entrar</button>
    </form>
  );
}

export const getServerSideProps = withSSRguest<{}>(async (ctx) => {
  return {
    props: {},
  };
});
