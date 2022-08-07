import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table, Segment, Header } from 'semantic-ui-react'

const Users = () => {
  const usersSummary = useSelector((state) => state.users) // too much information

  if (usersSummary.length === 0) {
    return (
      <div>
        <p>Users non-existent...</p>
      </div>
    )
  }

  return (
    <Segment>
      <Header as="h2">Users</Header>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Blogs count</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {usersSummary.map((user) => (
            <Table.Row key={user.id}>
              <Table.Cell>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </Table.Cell>
              <Table.Cell>{user.blogsCount}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Segment>
  )
}

export default Users
