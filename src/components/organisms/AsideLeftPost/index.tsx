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
import { AiOutlinePushpin, AiFillPushpin } from 'react-icons/ai';
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
import { IUser } from '@models/IFUser';

const AsideLeftPost = ({
  post,
  user,
  creator
}: {
  post: IFPost
  user?: IUser
  creator: IUser
}) => {
  const { shortUrl } = useParams();
  const { setUnauthorized } = useContext(UnauthorizedContext);
  const { getSinglePostApi, toggleAssociatePost, toggleSavesPost, togglePinPost } = usePosts();
  const [ isLike, setIsLike ] = useState<boolean>(false);
  const [ isDislike, setIsDislike ] = useState<boolean>(false);
  const [ isHeart, setIsHeart ] = useState<boolean>(false);
  const [ isStart, setIsStart ] = useState<boolean>(false);
  const [ isSave, setIsSave ] = useState<boolean>(false);
  const [ isPined, setIsPined ] = useState<boolean>(false);

  const handleSubmit = (rs: any, setState: any, isValue: boolean) => {
    if (rs.status === 200 || rs.statusCode === 200) {
      shortUrl && getSinglePostApi({ shortUrl });
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

  const handlePin = () => {
    setIsPined(!isPined);
    togglePinPost({ id: post.id })
      .unwrap()
      .then((rs) => handleSubmit(rs, setIsPined, !isPined));
  };

  const toggleAssociate = (associate: Associate, setState: any, state: boolean) => {
    setState(!state);
    toggleAssociatePost({ id: post.id }, { associate })
      .unwrap()
      .then((rs) => handleSubmit(rs, setIsLike, !state));
  };

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
    setIsPined(post.isPinned);
    setIsSave(user ? post.saves.includes(user._id) : false);
    setIsStart(user ? post.stars.includes(user._id) : false);
    setIsHeart(user ? post.hearts.includes(user._id) : false);
    setIsDislike(user ? post.disLikes.includes(user._id) : false);
    setIsLike(user ? post.likes.includes(user._id) : false);
  }, [ shortUrl, user, creator, post ]);

  return (
    <AsideLef>
      {user && user._id === creator._id ? (
        <IconButtonBox>
          <IconButton
            Element={isPined ? AiFillPushpin : AiOutlinePushpin}
            size={18}
            handleClick={handlePin}
            title={isPined ? 'Pinned' : 'Pin'}
          />
        </IconButtonBox>
      ): (
        <>
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
        </>
      )}
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

const IconButtonBox = styled.div`
  width: 100%;
  text-align: center;
`;
