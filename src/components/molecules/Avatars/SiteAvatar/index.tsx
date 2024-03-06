import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { TEXT_LOGO_BLACK, TEXT_LOGO_WHITE } from '@constants/aws/s3';
import { useCookies } from '@hooks/useCookies';
import { themes } from '@constants/theme';

const SiteAvatar = ({ viewerPhoto, height }: { viewerPhoto?: string; height?: number }) => {
  const { getCookies } = useCookies();
  const [ src, setSrc ] = useState<string>();

  useEffect(() => {
    if (viewerPhoto) {
      setSrc(viewerPhoto);
    } else {
      setSrc(getCookies([ 'theme' ]).theme === themes.darkMode ? TEXT_LOGO_WHITE : TEXT_LOGO_BLACK);
    }
  }, [ viewerPhoto ]);

  return (
    <Avatar $height={height}>
      <img src={src} alt="pic" />
    </Avatar>
  );
};

export default React.memo(SiteAvatar);

const Avatar = styled.figure<{ $height?: number }>`
  padding: 0;
  margin: 0;
  flex: 0 0 ${({ $height }) => $height ? ($height + 'px') : '32px'};
  width: ${({ $height }) => $height ? ($height + 'px') : '32px'};

  img {
    height: ${({ $height }) => $height ? ($height + 'px') : '32px'};
    width: ${({ $height }) => $height ? ($height + 'px') : '32px'};
    border-radius: 50%;
    display: block;
    object-fit: cover;
  }
`;
