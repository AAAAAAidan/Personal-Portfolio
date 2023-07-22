export default function Add() {
  return (
    <form method="post">

      <h1>Account Credentials</h1>
      <h3>Username</h3>
      <input type="text" name="username" />
      <h3>Password</h3>
      <input type="password" name="password" />

      <h1>Model Data</h1>
      <h3>Filename</h3>
      <input type="text" name="filename" />
      <h3>Title</h3>
      <input type="text" name="title" />
      <h3>Description</h3>
      <input type="text" name="description" />

      <h1>Save</h1>
      <p><input type="submit" value="Save as file" formAction="api/files" /></p>
      <p><input type="submit" value="Save as folder" formAction="api/folders" /></p>

    </form>
  )
}
