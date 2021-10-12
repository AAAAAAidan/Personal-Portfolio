export default function Add() {
  return (
    <form action="api/files" method="post">

      <h1>Account Credentials</h1>
      <h3>Username</h3>
      <input type="text" name="username" />
      <h3>Password</h3>
      <input type="password" name="password" />

      <h1>File Data</h1>
      <h3>Filename</h3>
      <input type="text" name="filename" required />
      <h3>File</h3>
      <input type="file" name="file" />
      <h3>Title</h3>
      <input type="text" name="title" />
      <h3>Description</h3>
      <input type="text" name="description" />

      <h1>Save</h1>
      <input type="submit" value="Save" />

    </form>
  )
}
