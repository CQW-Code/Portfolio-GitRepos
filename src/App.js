import React from "react";
import {
  Button,
  Card,
  Divider,
  Icon,
  Grid,
  Header,
  Segment
} from "semantic-ui-react";
import styled, { keyframes } from "styled-components";
import HeaderText from "./HeaderText";
import axios from "axios";

const ButtonLink = styled.a`
  float: right;
  padding: 10px 30px;
  border-radius: 10px;
  color: ${props => props.theme.fg} !important;
  background-color: ${props => props.theme.bg} !important;
`;

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const SearchBox = styled.input.attrs({
  placeholder: "search"
})`
  border-radius: 10px;
  padding: 10px;
  margin: 10px;
  background: #dcdcdc;
  border: solid 2px black !important;
`;

const Star = styled.div`
  display: inline-block;
  color: yellow;
  text-shadow: 1px 1px 1px black;
  animation: ${rotate360} 2s linear infinite;
`;

const AppContainer = styled.div`
  background: linear-gradient(to top left, #9bcd9b, #577a3a);
`;

const Transparent = styled.div`
  background: transparent !important;
`;

const StyledCard = styled(Card)`
  height: 200px;
  border: solid 2px black !important;
  background-color: #gray !important;
`;

const IssueCard = StyledCard.extend`
  border: solid 4px red !important;
`;

const Truncated = styled.div`
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
// TODO: in need of refactoring DRY!
const Linkedin = styled.div`
  color: #0077b5;
  text-align: center;
  font-size: 2.5rem;
  margin: 5px;
  padding: 5px;
`;

const Github = styled.div`
  font-size: 2.5rem;
  text-align: center;
  color: #4078c0;
  margin: 5px;
  padding: 5px;
`;

const Email = styled.div`
  color: #ea4335;
  text-align: center;
  font-size: 2.5rem;
  margin: 5px;
  padding: 5px;
`;

const Text = styled.div`
  color: black;
  font-size: 1.75rem;
`;

class App extends React.Component {
  state = { repos: [], visible: [] };

  componentDidMount() {
    axios
      .get("https://api.github.com/users/CQW-Code/repos?sort=created")
      .then(res => this.setState({ repos: res.data, visible: res.data }));
  }

  search = () => {
    const { repos } = this.state;
    let regex = new RegExp(this.searchTerm.value.toLowerCase());
    if (this.searchTerm.value === "") {
      this.setState({ visible: repos });
    } else {
      this.setState({
        visible: repos.filter(r => regex.test(r.full_name.toLowerCase()))
      });
    }
  };

  render() {
    return (
      <AppContainer>
        <Header fSize="large" as={HeaderText}>
          My Portfolio
        </Header>
        <Segment as={Transparent}>
          <Header as={HeaderText}>My Projects</Header>
          <label>Search</label>
          <SearchBox
            onChange={this.search}
            innerRef={n => (this.searchTerm = n)}
          />
          <Grid>
            <Grid.Row>
              {this.state.visible.map(r => {
                const Component = r.open_issues > 0 ? IssueCard : StyledCard;
                return (
                  <Grid.Column key={r.id} width={4}>
                    <Component>
                      <Card.Content>
                        <Card.Header>
                          <Truncated>{r.full_name}</Truncated>
                        </Card.Header>
                        <Card.Meta>{r.description}</Card.Meta>
                        {r.stargazers_count > 0 && (
                          <Star>
                            <Icon name="star" />
                          </Star>
                        )}
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
                );
              })}
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment as={Transparent}>
          <Header as={HeaderText}>Contact Information</Header>
          <Divider hidden />
          {/* TODO: trying to get the row of icons centered */}
          <Grid>
            <Grid.Row>
              <Grid.Column width={3}>
                <Linkedin>
                  <Icon name="linkedin" />
                  <Text>LinkedIn</Text>
                </Linkedin>
              </Grid.Column>
              <Grid.Column width={4} textAlign="center">
                <Github>
                  <Icon
                    link="https://github.com/CQW-Code"
                    target="_blank"
                    rel="noopener noreferrer"
                    name="github"
                  />
                  <Text>GitHub</Text>
                </Github>
              </Grid.Column>
              <Grid.Column width={4} textAlign="center">
                <Email>
                  <Icon name="mail" />
                  <Text>EMail</Text>
                </Email>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </AppContainer>
    );
  }
}

export default App;
