import React, { Fragment } from "react";
import styled, { css } from "styled-components";
import * as Polished from 'polished';
import { useQuery } from '@apollo/react-hooks';
import { Link, useLocation } from "react-router-dom";
import { Colors } from '../styles/Colors';

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
  margin-right: 30px;
  border-radius: 5px;
  transition: all 0.1s;
  color: ${(props) =>
    props.active ? Colors.Pink : Colors.Grey4};
  background-color: ${Colors.White};
  font-size: 1.8rem;
  font-weight: 800;
  

  &:hover {
    cursor: pointer;
    color: ${(props) =>
      props.active ? Colors.Pink : Polished.rgba(Colors.Pink, 0.8)};
  }
`;

const Space = styled.div`
  height: 20px;
`;

const Container = styled.div`
  position: relative;
  margin-bottom: 30px;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: Row;
`;

type SideNavigationButtonsProps = {};

const SideNavigationButtons: React.FC<SideNavigationButtonsProps> = () => {
  // const { data } = useQuery(IS_SUPER_USER);
  const { pathname } = useLocation();

  const buttons: any[] = [
    {
      text: "Overview",
      link: "/dashboard/overview",
      iconSize: "2.4rem",
      iconMargin: "0px 0 -4px",
      active: ["/dashboard/overview"],
    },
    {
      text: "Install Button",
      link: "/dashboard/install-button",
      iconSize: "2.4rem",
      iconMargin: "0px 0 -4px",
      active: ["/dashboard/install-button"],
    },
    {
      text: "Settings",
      link: "/dashboard/settings",
      iconSize: "2.4rem",
      iconMargin: "0px 0 -4px",
      active: ["/dashboard/settings"],
    },
  ];

  const superUser = {
    text: "Super Admin",
    link: "/admin/dashboard/super/organizations",
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


  return (
    <Container>
      <Buttons>
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
              {b.text}
            </SideNavigationLinkButton>
          );
        })}
      </Buttons>
    </Container>
  );
};

export default SideNavigationButtons;
