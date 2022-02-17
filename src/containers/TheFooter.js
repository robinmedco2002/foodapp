import React from 'react'
import {CFooter} from '@coreui/react'

const TheFooter = () => {
    return (
        <CFooter fixed={false}>
            <div className="mfs-auto">
                <p>All Rights Are Reserved © 2021 HomeFoodyy</p>
            </div>
        </CFooter>
    )
}

export default React.memo(TheFooter)
