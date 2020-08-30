import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Icons } from '../elements/Icon';
import { Colors } from '../styles/Colors';
import DetailsCard from '../elements/DetailsCard';
import Label from '../elements/Label';
import LabeledInput from "../elements/LabeledInput";
import Flex from "../elements/Flex"
import ColorPicker from '../elements/ColorPicker';
import Menu, { MenuEventTypes } from "../elements/Menu";

const Section = styled.div`
  margin-right: 20px;
`;

const SelectColorContainer = styled.div`
  border: 1px solid ${Colors.Grey5};
  width: 100px;
  height: 48px;
  display: flex;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;
`;

const SelectColorColor = styled.div`
  height: 26px;
  width: 26px;
  background-color: ${props => props.color};
  border-radius: 5px;
  margin: 0 7px;
  border: 1px solid ${Colors.Grey5};
`;

const SelectColorText = styled.div`
  font-size: 1.2rem;
  color: ${Colors.Blue};
  font-weight: 400;
`;

const ImmutableTextArea = styled.div`
  height: fit-content;
  width: 360px;
  padding: 10px 15px;
  border-radius: 10px;
  border: 1px solid ${Colors.Grey5};
`;

const Spacer = styled.div`
  height: 25px;
`;

function getEmbedHTML(organizationId: string, text: string, buttonColor: string, color: string) {
  return (`
    <a href="#" style="text-decoration:none;">
      <img src onerror="window.Matchstik.load('${organizationId}')" style="display:none;"> 
      <div style="
        background-color:${buttonColor}; 
        color:${color}; 
        font-family: sans-serif;
        border-radius: 100px; 
        height:50px; 
        width:160px; 
        display:inline-flex; 
        align-items:center; 
        justify-content:center; 
        font-weight: 600;
        font-size: 14px;
      "
      onClick="window.Matchstik.open('${organizationId}')">${text}</div>
    </a>
  `);
}

type CreateDonationButtonProps = {};

const CreateDonationButton: React.FC<CreateDonationButtonProps> = () => {
  /** Hooks */
  const [text, setText] = useState("Donate Now");
  const [color, setColor] = useState(Colors.White);
  const [buttonColor, setButtonColor] = useState(Colors.Pink);
  const fontAnchorElement = useRef<any>(null);
  const buttonAnchorElement = useRef<any>(null);

  /* Render */
  const HTML = getEmbedHTML("ORG ID", text, buttonColor, color);

  return (
    <DetailsCard
      title="Button Design"
      headerIcon={Icons.Embed}
      width="600px"
    >
      <Flex>
        <Section>
          <Label text={"Button Preview"} />
          <div dangerouslySetInnerHTML={{ __html: HTML }} />
        </Section>
      </Flex>
      <Spacer />
      <Flex>
        <Section>
          <LabeledInput
            label="Button Text"
            placeholder="Donate Now"
            value={text}
            onChange={(e: React.FormEvent<HTMLInputElement>) =>
              setText(e.currentTarget.value)
            }
          />
        </Section>
        <Section>
          <Label text="Button Color" />
          <SelectColorContainer ref={buttonAnchorElement}>
            <SelectColorColor color={buttonColor} />
            <SelectColorText>{buttonColor.toUpperCase()}</SelectColorText>
          </SelectColorContainer>
          <Menu
            menuHead={
              <ColorPicker
                color={buttonColor}
                onChange={({ hex }: { hex: any }) => setButtonColor(hex)}
              />
            }
            anchorElement={buttonAnchorElement}
            openEvent={MenuEventTypes.Click}
            closeEvent={MenuEventTypes.Click}
            width="fit-content"
          />
        </Section>
        <Section>
          <Label text="Font Color" />
          <SelectColorContainer ref={fontAnchorElement}>
            <SelectColorColor color={color} />
            <SelectColorText>{color.toUpperCase()}</SelectColorText>
          </SelectColorContainer>
          <Menu
            menuHead={
              <ColorPicker
                color={color}
                onChange={({ hex }: { hex: any }) => setColor(hex)}
              />
            }
            anchorElement={fontAnchorElement}
            openEvent={MenuEventTypes.Click}
            closeEvent={MenuEventTypes.Click}
            width="fit-content"
          />
        </Section>
      </Flex>
      <Spacer />
      <Label
        text={"Paste this code snippet into the <head> of your entrire site:"}
      />
      <ImmutableTextArea>
        <div>{'<script src="https://js.stripe.com/v3/"></script>'}</div>
        <div>
          {'<script src="https://donate.matchstik.io /embed.js"></script>'}
        </div>
      </ImmutableTextArea>
      <Spacer />
      <Label text={"Embed this code where you want the button to show up:"} />
      <ImmutableTextArea>{HTML}</ImmutableTextArea>
    </DetailsCard>
  );
};

export default CreateDonationButton;