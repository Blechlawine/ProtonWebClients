import React from 'react';
import { c } from 'ttag';

import { IllustrationPlaceholder } from 'react-components';

import noContentSvg from './no-contents.svg';
import UploadButton from '../uploads/UploadButton';

const EmptyFolder = () => (
    <div className="p2 mt2 flex w100 flex flex-item-fluid">
        <IllustrationPlaceholder url={noContentSvg} title={c('Info').t`There are no files yet`}>
            <p className="m0">{c('Info').t`Drag and drop a file here or choose to upload.`}</p>
            <div className="mt2 flex flex-column flex-nowrap w200p">
                <UploadButton />
            </div>
        </IllustrationPlaceholder>
    </div>
);

export default EmptyFolder;
