const EMPTY_ARRAY = Array(5).fill('');

type TRatingStarsProps = {
    defaultScore?: number;
    onChange(score: number): void;
};

import { Icon } from '@chakra-ui/react';
import Colors from '@/styles/tokens/color';
import { HContainer } from './container/container.ui';

import { MdStar } from 'react-icons/md';
import { useState } from 'react';

function RatingStars({ defaultScore, onChange, ...props }: TRatingStarsProps) {
    const [score, setScore] = useState(defaultScore || 0);

    return (
        <HContainer style={{ alignSelf: 'center' }} {...props}>
            {EMPTY_ARRAY.map((_, index) => {
                const currentIndex = index + 1;
                const shouldPaintStar = currentIndex <= score || false;
                const starIconColor = shouldPaintStar ? Colors.PRIMARY : Colors.WHITE_TRANSPARENT;

                return (
                    <Icon
                        boxSize={8}
                        as={MdStar}
                        key={currentIndex}
                        color={starIconColor}
                        _hover={{
                            cursor: 'pointer',
                            color: Colors.PRIMARY,
                        }}
                        onClick={() => {
                            setScore(currentIndex);
                            if (onChange) onChange(currentIndex);
                        }}
                    />
                );
            })}
        </HContainer>
    );
}

export default RatingStars;
