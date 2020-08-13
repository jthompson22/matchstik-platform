import React, { Fragment } from "react";
import styled, { css } from "styled-components";
import * as Polished from 'polished';
import { useQuery } from '@apollo/react-hooks';
import { Link, useLocation } from "react-router-dom";
import { Colors } from '../styles/Colors';
import Icon, { Icons } from '../elements/Icon';

type SideNavigationButtonProps = {
  active: number;
};

const SideNavigationLinkButton = styled(Link)<SideNavigationButtonProps>`
  position: relative;
  height: 35px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
  padding: 0 10px;
  margin-bottom: 15px;
  border-radius: 5px;
  transition: all 0.1s;
  color: ${(props) =>
    props.active ? Colors.White : Polished.rgba(Colors.White, 0.7)};
  background-color: ${(props) =>
    props.active ? Polished.rgba(Colors.White, 0.1) : null};

  &:hover {
    cursor: pointer;
    color: ${(props) =>
      props.active ? Colors.White : Polished.rgba(Colors.White, 0.8)};
    background-color: ${Polished.rgba(Colors.White, 0.1)};
  }
`;

const SideNavigationButton = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
  padding: 0 10px;
  margin-bottom: 15px;
  border-radius: 5px;
  transition: all 0.1s;
  color: ${Polished.rgba(Colors.White, 0.7)};

  &:hover {
    cursor: pointer;
    color: ${Polished.rgba(Colors.White, 1)};
  }
`;

const Text = styled.span`
  font-size: 1.4rem;
  font-weight: 600;
`;

const Space = styled.div`
  height: 20px;
`;

const Container = styled.div`
  position: relative;
  height: calc(100% - 20px);
`;

const TopContainer = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: column;
`;

const BottomContainer = styled.div`
  position: absolute;
  bottom: 0px;
  display: flex;
  flex-direction: column;
  padding: 20px 20px 0;
  margin-bottom: 5px;
  border-top: 1px solid ${Polished.rgba(Colors.White, 0.2)};
  width: calc(100% - 40px);
`;

type SideNavigationButtonsProps = {};

const SideNavigationButtons: React.FC<SideNavigationButtonsProps> = () => {
  // const { data } = useQuery(IS_SUPER_USER);
  const { pathname } = useLocation();

  const buttons: any[] = [
    {
      text: "Projects",
      link: "/dashboard/projects",
      // icon: Icons.DashboardRegular,
      // activeIcon: Icons.DashboardSolid,
      iconSize: "2.4rem",
      iconMargin: "0px 0 -4px",
      active: ["/dashboard/projects", "/dashboard/projects/details"],
    },
    {
      text: "Team Members",
      link: "/dashboard/settings/team",
      // icon: Icons.CalendarStarRegular,
      // activeIcon: Icons.CalendarStarSolid,
      iconSize: "2.4rem",
      iconMargin: "0px 0 -4px",
      active: ["/dashboard/settings/team"],
    },
    {
      text: "Billing",
      link: "/dashboard/settings/billing",
      // icon: Icons.CalendarStarRegular,
      // activeIcon: Icons.CalendarStarSolid,
      iconSize: "2.4rem",
      iconMargin: "0px 0 -4px",
      active: ["/dashboard/settings/billing"],
    },
  ];

  const superUser = {
    text: "Super Admin",
    link: "/admin/dashboard/super/organizations",
    // icon: Icons.BoxOfficeRegular,
    // activeIcon: Icons.BoxOfficeSolid,
    iconSize: "2.4rem",
    iconMargin: "0px 0 -4px",
    active: [
      "/admin/dashboard/super/organizations",
      "/admin/dashboard/super/organizations/details",
      "/admin/dashboard/super/sites",
      "/admin/dashboard/super/settings"
    ]
  };

  // if (data && data.isSuperUser) {
  //   buttons.push(superUser);
  // }

  const bottomButtons = [
    {
      text: "Search (cmd + f)",
      onClick: () => {},
    },
    {
      text: "Learning Center",
      onClick: () => {},
    },
    {
      text: "Get Help",
      onClick: () => {},
    },
  ];

  return (
    <Container>
      <TopContainer>
        {buttons.map((b, i) => {
          if (b.space) {
            return <Space key={i} />;
          }

          const active = b.active.includes(pathname);
          return (
            <SideNavigationLinkButton
              key={i}
              to={b.link}
              active={active ? 1 : 0}
            >
              {/* <Icon 
                icon={active ? b.activeIcon : b.icon} 
                color={active ? Colors.White : Polished.rgba(Colors.White, 0.5)} 
              /> */}
              <Text>{b.text}</Text>
              {active && (
                <Icon
                  size={14}
                  icon={Icons.RightChevron}
                  color={Colors.White}
                />
              )}
            </SideNavigationLinkButton>
          );
        })}
      </TopContainer>
      <BottomContainer>
        {bottomButtons.map((b, i) => {
          return (
            <SideNavigationButton key={i}>
              {/* <Icon 
                icon={active ? b.activeIcon : b.icon} 
                color={active ? Colors.White : Polished.rgba(Colors.White, 0.5)} 
              /> */}
              <Text>{b.text}</Text>
            </SideNavigationButton>
          );
        })}
      </BottomContainer>
    </Container>
  );
};

export default SideNavigationButtons;
