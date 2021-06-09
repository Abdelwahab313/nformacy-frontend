import LinkText from 'components/typography/LinkText';
import TextCroppedWithTooltip from 'components/typography/TextCroppedWithTooltip';
import React from 'react';

const RefIDLink = ({ refID, onClickLink }) => {
    return (
        <LinkText to={() => !!onClickLink && onClickLink()}>
            <TextCroppedWithTooltip text={`#${refID}`} />
        </LinkText>
    );
};

export default RefIDLink;
