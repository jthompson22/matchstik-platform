import React, { useState, useEffect, useRef, useCallback } from "react";
import { usePopper } from "react-popper";
import styled, { keyframes, css } from "styled-components";
import { Colors } from '../styles/Colors';
import Icon from './Icon';

const dropAndFadeIn = keyframes`
  from {
    opacity: 0;
    top: -20px;
    visibility: hidden;
  }

  to {
    opacity: 1;
    top: 0px;
    visibility: visible;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    visibility: visible;
  }

  to {
    opacity: 0;
    visibility: hidden;
  }
`;

type ContainerProps = {
  visible: any;
  width?: string;
};

const OuterContainer = styled.div<ContainerProps>`
  visibility: ${props => props.visible ? 'visible' : 'hidden'};
  z-index: 1200;
  width: ${props => props.width || '275px'};
  animation: ${props => props.visible
    ? css`${dropAndFadeIn} 0.3s forwards`
    : css`${fadeOut} 0.3s forwards`};
`;

const MenuContainer = styled.div<ContainerProps>`
  visibility: ${props => props.visible ? 'visible' : 'hidden'};
  display: flex;
  flex-direction: column;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  background: ${Colors.White};
`;

type MenuItemProps = {
  justify?: string;
}
const MenuItem = styled.div<MenuItemProps>`
  display: flex;
  justify-content: ${props => props.justify || `flex-start`};
  padding: 10px 20px;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background: ${Colors.Grey6};
  }
`;

type TextProps = {
  color?: string;
}
const MenuItemText = styled.div<TextProps>`
  color: ${props => props.color || `${Colors.Grey2}`};
  font-weight: 600;
  font-size: 1.2rem;
`;

type MenuItemsProps = {
  menuHead?: boolean;
}

const MenuItemsContainer = styled.div<MenuItemsProps>`
  margin: ${props => props.menuHead ? '00px 0px 10px 0px' : '10px 0px 10px 0px'};
`;

const Space = styled.div`
  height: 10px;
`;

const IconContainer = styled.div`
  width: 20px;
  margin-right: 15px;
`;

const ImageContainer = styled.div`
  margin-right: 10px;
`;

export enum MenuEventTypes {
  Click = 'click',
  MouseEnter = 'mouseenter',
  MouseLeave = 'mouseleave',
  MouseDown = 'mousedown',
}

export enum PopperPlacementTypes {
  TopStart = 'top-start',
  Top = 'top',
  TopEnd = 'top-end',
  RightStart = 'right-start',
  Right = 'right',
  RightEnd = 'right-end',
  BottomStart = 'bottom-start',
  Bottom = 'bottom',
  BottomEnd = 'bottom-end',
  LeftStart = 'left-start',
  Left = 'left',
  LeftEnd = 'left-end',
}

type MenuProps = {
  menuHead?: React.ReactNode;
  openEvent: string;
  closeEvent: string;
  anchorElement: any;
  menuItems?: any[];
  width?: string;
  justify?: string;
  placement?: PopperPlacementTypes;
}

const Menu: React.FC<MenuProps> = ({
  menuHead,
  menuItems,
  openEvent,
  closeEvent,
  anchorElement,
  width,
  justify,
  placement = PopperPlacementTypes.BottomEnd,
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  // const [menuElement, setMenuElement] = useState<any>(null);
  const menuElement = useRef<any>(null);
  const { styles, attributes } = usePopper(
    anchorElement.current,
    menuElement.current,
    {
      placement,
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 5]
          }
        },
        {
          name: 'preventOverflow',
          options: {
            padding: 0,
          },
        },
      ]
    }
  );

  const openMenu = () => {
    setVisible(true);
  };

  const closeMenu = () => {
    setVisible(false);
  };

  // TODO: add other event type listeners in useEffect and figure out
  // why this only closes on second click when you click on a side nav item with the menu open
  // if we put this in useEffect or useCallback, it only opens on second click..
  const handleClick = (event: MouseEvent) => {
    if (!anchorElement
      || !anchorElement.current.contains(event.target)
      || (anchorElement.current.contains(event.target) && visible)) {
      closeMenu();
    }
  };

  useEffect(() => {
    const currentAnchor = anchorElement?.current;
    const currentMenu = menuElement?.current;
    currentAnchor?.addEventListener(openEvent, openMenu);
    currentMenu?.addEventListener(MenuEventTypes.Click, closeMenu);

    if (closeEvent === MenuEventTypes.Click) document.addEventListener(closeEvent, handleClick);

    return () => {
      currentAnchor?.removeEventListener(openEvent, openMenu);
      currentMenu?.removeEventListener(MenuEventTypes.Click, closeMenu);

      if (closeEvent === MenuEventTypes.Click) document.removeEventListener(closeEvent, handleClick);
    };
  }, [openEvent, closeEvent, anchorElement, menuElement, handleClick]);

  return (
    <OuterContainer
      ref={menuElement}
      style={styles.popper}
      {...attributes.popper}
      width={width}
      visible={visible}>
      <MenuContainer visible={visible}>
        {menuHead}
        <MenuItemsContainer menuHead={!!menuHead}>
          {menuItems && menuItems.map((item, index) => {
            if (item.space) return <Space key={index} />
            return (
              <MenuItem
                justify={justify}
                key={index}
                onClick={() => {
                  item.onClick();
                  closeMenu();
                }}>
                {item.image
                  ? (
                    <ImageContainer>
                      {item.image}
                    </ImageContainer>
                  )
                  : item.icon
                  ? (
                    <IconContainer>
                      <Icon
                        icon={item.icon}
                        color={Colors.Grey2}
                        size={16}
                      />
                    </IconContainer>
                  )
                  : null
                }
                  <MenuItemText color={item.color}>
                    {item.text}
                  </MenuItemText>
              </MenuItem>
            )
          })}
        </MenuItemsContainer>
      </MenuContainer>
    </OuterContainer>
  );
}

export default Menu;