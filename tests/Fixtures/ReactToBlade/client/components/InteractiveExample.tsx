export default function InteractiveExample({ user }: { user: { name: string } }) {
  return (
    <button onClick={() => save()}>{user.name}</button>
  )
}
