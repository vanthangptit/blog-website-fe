import React, {
  useContext,
  useMemo,
  useState,
  useEffect
} from 'react';
import {
  BiLike,
  BiSolidLike,
  BiDislike,
  BiSolidDislike,
  BiHeart,
  BiSolidHeart,
  BiStar,
  BiSolidStar
} from 'react-icons/bi';
import { TbHeartPlus } from 'react-icons/tb';
import { FaBookmark, FaRegBookmark  } from 'react-icons/fa';
import styled from 'styled-components';
import PopupActions from '@components/molecules/Popups/PopupActions';
import IconButton from '@components/atoms/IconButton';
import { useParams } from 'react-router-dom';
import { toasts } from '@utils/toast';
import { TOAST } from '@constants/toast';
import { Associate, IFPost } from '@models/IFPosts';
import { usePosts } from '@hooks/usePost';
import { UnauthorizedContext } from '@infra/context/UnauthorizedContext';

const AsideLeftPost = ({ post }: { post: IFPost }) => {
  const { shortUrl } = useParams();
  const { setUnauthorized } = useContext(UnauthorizedContext);
  const { toggleAssociatePost, toggleSavesPost } = usePosts();
  const [ isLike, setIsLike ] = useState<boolean>(false);
  const [ isDislike, setIsDislike ] = useState<boolean>(false);
  const [ isHeart, setIsHeart ] = useState<boolean>(false);
  const [ isStart, setIsStart ] = useState<boolean>(false);
  const [ isSave, setIsSave ] = useState<boolean>(false);

  const handleSubmit = (rs: any, setState: any, isValue: boolean) => {
    if (rs.status === 200 || rs.statusCode === 200) {
      return;
    }

    setState(!isValue);
    if (rs.status === 401 || rs.statusCode === 401) {
      setUnauthorized(true);
    } else {
      toasts('error', TOAST.ERROR_COMMON);
    }
  };

  const handleSavePost = () => {
    setIsSave(!isSave);
    toggleSavesPost({ id: post.id })
      .unwrap()
      .then((rs) => handleSubmit(rs, setIsSave, !isSave));
  };

  const toggleAssociate = (associate: Associate, setState: any, state: boolean) => {
    setState(!state);
    toggleAssociatePost({ id: post.id }, { associate })
      .unwrap()
      .then((rs) => handleSubmit(rs, setIsLike, !state));
  };

  // eslint-disable-next-line no-console
  console.log(setIsSave);

  const listIcons = useMemo(() => {
    return [
      {
        element: isLike ? BiSolidLike : BiLike,
        title: 'Like',
        link: '#',
        onClick: () => toggleAssociate('likes', setIsLike, isLike)
      },
      {
        element: isDislike ? BiSolidDislike : BiDislike,
        title: 'Dislike',
        link: '#',
        onClick: () => toggleAssociate('disLikes', setIsDislike, isDislike)
      },
      {
        element: isHeart ? BiSolidHeart : BiHeart,
        title: 'Heart',
        link: '#',
        onClick: () => toggleAssociate('hearts', setIsHeart, isHeart)
      },
      {
        element: isStart ? BiSolidStar : BiStar,
        title: 'Star',
        link: '#',
        onClick: () => toggleAssociate('stars', setIsStart, isStart)
      }
    ];
  }, [ isLike, isDislike, isHeart, isStart ]);

  useEffect(() => {
    /**
     * @todo: get user current to set ui default
     */
  }, [ shortUrl ]);

  return (
    <AsideLef>
      <PopupActions
        iconButton={{
          Element: TbHeartPlus,
          sizeDots: 25,
          title: 'Add Reaction'
        }}
        boxIcons={{
          icons: listIcons,
          positionLeft: 'calc(100% + 10px)',
          positionTop: '0px'
        }}
      />
      <IconButtonBox>
        <IconButton
          Element={isSave ? FaBookmark : FaRegBookmark}
          size={18}
          handleClick={handleSavePost}
          title={'Save'}
        />
      </IconButtonBox>
      <PopupActions
        threeDot={{
          bgDots: 'transparent',
          sizeDots: 25
        }}
        boxLinks={{
          positionLeft: 'calc(100% + 10px)',
          positionTop: '0px'
        }}
      />
    </AsideLef>
  );
};

export default React.memo(AsideLeftPost);

const AsideLef = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  justify-content: space-around;
  padding: 15px 0;
  
  @media (min-width: 768px) {
    flex-direction: column;
    padding: 0;
  }
`;

const IconButtonBox = styled.div``;
