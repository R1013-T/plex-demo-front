import { exectest } from "@/lib/api/test";

export default function Home() {
  const handleClick = async () => {
    const res = await exectest();
    console.log(res);
  };

  return (
    <main>
      <button onClick={handleClick}>test hello</button>
    </main>
  );
}
