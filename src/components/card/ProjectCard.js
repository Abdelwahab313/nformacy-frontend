import React from 'react';
import styled from 'styled-components';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import { history } from 'services/navigation';
import { RoutesPaths } from 'constants/routesPath';

const cardWidth = 320;
const borderRadius = 8;
const transition = 'all 0.45s ease';

const Screenshot = styled.figure`
  z-index: 200;
  position: relative;
  margin: 0;
  padding: 0;
  width: ${cardWidth}px;
  height: 200px;
  background: url(${(props) => props.image}) 0 0 no-repeat;
  background-size: cover;
  border-radius: ${borderRadius}px ${borderRadius}px 0 0;
  overflow: hidden;
  backface-visibility: hidden;
  transition: ${transition};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0);
    transition: ${transition};
  }
`;

const Content = styled.div`
  z-index: 200;
  position: relative;
  padding: 20px 20px 30px;
`;

const Title = styled.span`
  display: block;
  margin-bottom: 4px;
  font-size: 1.25em;
  font-weight: 500;
  transition: ${transition};
`;

const IconsConainer = styled.div`
  // position: absolute;
  // bottom: 12px;
  left: 12px;
  display: flex;
`;

const PercentageText = styled.span`
  display: block;
  font-size: 0.875em;
  color: #999999;
  transition: ${transition};
  transition-delay: 0.04s;
`;

const Description = styled.span`
  display: block;
  font-size: 0.875em;
  color: #999999;
  transition: ${transition};
  transition-delay: 0.04s;
`;

const BottomBar = styled.span`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 10px;
  background: ${(props) => props.background && props.background};
  border-radius: 0 0 ${borderRadius}px ${borderRadius}px;
  transition: ${transition};
`;

const Percentage = styled.a`
    font-size: 13px;
    height: 20px;
    margin-right: 5px;
    border-radius: 3px;
    background-color: rgba(0,0,0,.07);
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 5px;
    color: #fff;
    transition: .15s;
}
`;

const Style = styled.button`
    padding: 0;
    border: 0;
    -webkit-appearance: none;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  position: relative;
  flex-shrink: 0;
  width: ${cardWidth}px;
  text-align: left;
  background: #ffffff;
  border-radius: ${borderRadius}px;
  cursor: pointer;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.12), 0 20px 20px -10px rgba(0, 0, 0, 0.125);
  transition: ${transition};

  &:hover {
    transform: scale(1.04);

    ${Title},
    ${Description},
    ${BottomBar} {
      transform: scale(0.92);
    }

    ${Title} {
      transform: translateY(-10px);
    }

    ${Description} {
      transform: translateY(-12px);
    }

    ${BottomBar} {
      border-radius: ${borderRadius - 2}px;
      transform: translateY(-14px) scale(0.9);
    }

    ${Screenshot} {
      transform: translateY(4px) scale(0.92);
      border-radius: ${borderRadius - 2}px;

      &::before {
        background: rgba(0, 0, 0, 0.1);
      }
    }
  }
`;

const ProjectCard = ({ hexa, title, percentage, assignmentsCount, image }) => (
  <Style
    onClick={() => {
      history.push({
        pathname: RoutesPaths.App.ProjectDetails,
        state: { projectId: 1 },
      });
    }}>
    <Screenshot image={image} />
    <Content>
      <Title>{title}</Title>
      <IconsConainer>
        <Percentage>
          <PercentageText>`{percentage}%`</PercentageText>
          <DonutLargeIcon />
        </Percentage>
        <Percentage>
          <PercentageText>{assignmentsCount}</PercentageText>
          <CollectionsBookmarkIcon />
        </Percentage>
      </IconsConainer>
      <Description></Description>
      <BottomBar background={hexa} />
    </Content>
  </Style>
);

export default ProjectCard;
