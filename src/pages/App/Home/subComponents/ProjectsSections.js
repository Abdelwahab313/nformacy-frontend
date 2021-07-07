import ProjectCard from 'components/card/ProjectCard';
import { RoutesPaths } from 'constants/routesPath';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import HomePageCard from './HomePageCard';

const websites = [
  {
    hexa: '#1D1148',
    title: 'Swile',
    description: 'https://www.swile.co/',
    image:
      'https://res.cloudinary.com/vinzcelavi/image/upload/w_320,dpr_2.0/v1613408078/codesandbox/swile_x8mcnc.png',
  },
  {
    hexa: '#FFCD00',
    title: 'Typeform',
    description: 'https://www.welcometothejungle.com/fr/',
    image:
      'https://res.cloudinary.com/vinzcelavi/image/upload/w_320,dpr_2.0/v1613409201/codesandbox/typeform_vqqkob.png',
  },
  {
    hexa: '#FF5041',
    title: 'Smiirl',
    description: 'https://www.smiirl.com/',
    image:
      'https://res.cloudinary.com/vinzcelavi/image/upload/w_320,dpr_2.0/v1613409498/codesandbox/smiirl_qkuncq.png',
  },
  {
    hexa: '#000000',
    title: 'FoodChéri',
    description: 'https://www.foodcheri.com/',
    image:
      'https://res.cloudinary.com/vinzcelavi/image/upload/w_320,dpr_2.0/v1613410954/codesandbox/foodcheri_htkx8f.png',
  },
  {
    hexa: '#FFCD00',
    title: 'Welcome to the jungle',
    description: 'https://www.welcometothejungle.com/fr/',
    image:
      'https://res.cloudinary.com/vinzcelavi/image/upload/w_320,dpr_2.0/v1613408481/codesandbox/welcome-to-the-jungle_nemlnt.png',
  },
];

const Page = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  min-height: -webkit-fill-available; /* mobile viewport bug fix */
  overflow-x: auto;
  scroll-behavior: smooth;
`;

const Grid = styled.div`
  display: flex;
  flex-wrap: nowrap;
  padding: 10px 0;

  /* Fake padding-right */
  &::after {
    content: '';
    position: relative;
    display: block;
    flex-shrink: 0;
    height: 1px;
  }

  > button {
    margin-right: 40px;
  }

  /* Hide the others cards */
  > button:not(:first-child) {
    visibility: visible; /* switch to 'visible' */
  }
`;

const ProjectsSections = () => {
  const { t } = useTranslation();
  return (
    <HomePageCard
      title={t('topProjects')}
      viewMoreText={t('viewAll')}
      viewMoreUrl={RoutesPaths.App.ConsultantActivitiesList}>
      <Page>
        <Grid>
          {websites.map((website) => (
            <ProjectCard
              key={website.description}
              hexa={website.hexa}
              title={website.title}
              description={website.description}
              image={website.image}
            />
          ))}
        </Grid>
      </Page>
    </HomePageCard>
  );
};

export default ProjectsSections;
