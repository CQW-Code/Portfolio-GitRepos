import React from 'react';
import {
  Header,
  Button,
  Segment,
  Card,
  Icon,
  Grid,
} from 'semantic-ui-react';
import styled, { keyframes } from 'styled-components';
import HeaderText from './HeaderText';
import axios from 'axios';

const ButtonLink = styled.a`
  float: right;
  padding: 10px 30px;
  border-radius: 10px;
  color: ${ props => props.theme.fg } !important;
  background-color: ${ props => props.theme.bg } !important;
`

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const SearchBox = styled.input.attrs({
  placeholder: 'search'
})`
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
  background: #DCDCDC;
  border: solid 2px black !important;
`

const Star = styled.div`
  display: inline-block;
  color: yellow;
  text-shadow: 1px 1px 1px black;
  animation: ${rotate360} 2s linear infinite;
`

const AppContainer = styled.div`
  background: linear-gradient(to bottom right, #9BCD9B, #577A3A);
`

const Transparent = styled.div`
  background: transparent !important;
`

const StyledCard = styled(Card)`
  height: 200px;
  border: solid 2px black  !important;
  background-color: #EEC900 !important;
`

const IssueCard = StyledCard.extend`
  border: solid 4px red !important;
`

const Truncated = styled.div`
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

class App extends React.Component {
  state = { repos: [], visible: [] }

  componentDidMount() {
   axios.get('https://api.github.com/users/CQW-Code/repos?sort=created')
      .then( res => this.setState({ repos: res.data, visible: res.data }) )
  }

  search = () => {
    const { repos } = this.state;
    let regex = new RegExp(this.searchTerm.value.toLowerCase())
    if (this.searchTerm.value === '') {
      this.setState({ visible: repos })
    } else {
      this.setState({
        visible: repos.filter( r => regex.test(r.full_name.toLowerCase()) )
      })
    }
  }
  
  render() {
    return (
      <AppContainer>
        <Header fSize='large' as={HeaderText}>
          My Portfolio
        </Header>
        <Segment as={Transparent}>
          <Header as={HeaderText}>
            My Projects
          </Header>
          <label>Search</label>
          <SearchBox
            onChange={this.search}
            innerRef={ (n) => this.searchTerm = n }
          />
          <Grid>
            <Grid.Row>
              { this.state.visible.map( r => {
                  const Component = r.open_issues > 0 ?
                    IssueCard : StyledCard
                  return (
                    <Grid.Column key={r.id} width={4}>
                      <Component>
                        <Card.Content>
                          <Card.Header>
                            <Truncated>
                              { r.full_name }
                            </Truncated>
                          </Card.Header>
                          <Card.Meta>
                            { r.description }
                          </Card.Meta>
                          { r.stargazers_count > 0 &&
                              <Star>
                                <Icon name="star" />
                              </Star>
                          }
                        </Card.Content>
                        <Card.Content extra>
                          <ButtonLink
                            href={r.html_url}
                            target="_blank"
                            rel="noopener noreffer"
                          >
                            View
                          </ButtonLink>
                        </Card.Content>
                      </Component>
                    </Grid.Column>
                  )
                })
              }
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment as={Transparent}>
          <Header as={HeaderText}>
            Contact
            </Header>
            <Header fSize='small' as={HeaderText} >
            Currently not functioning
          </Header>
        </Segment>
      </AppContainer>
    )
  }
}

export default App;