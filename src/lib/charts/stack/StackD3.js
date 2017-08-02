/*
 * This file is part of the nivo project.
 *
 * Copyright 2016-present, Raphaël Benitte.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { flatten } from '../../../DataUtils'

/**
 * This wrapper is responsible for computing stack chart positions.
 * It's used for all Stack related chart components.
 *
 * @returns {{ compute: (function) }}
 * @constructor
 */
const StackD3 = () => {
    const layout = d3.layout.pack()

    return {
        /**
         *
         * @param {number}   width
         * @param {number}   height
         * @param {object}   data
         * @param {string}   identityProperty
         * @param {function} valueAccessor
         * @param {number}   padding
         * @param {function} color
         * @returns {array}
         */
        compute({ width, height, data, identityProperty, valueAccessor, padding, color }) {
            layout.value(valueAccessor).sort(null).size([width, height]).padding(padding)

            const flattened = flatten(data, identityProperty)
            const nodes = layout.nodes(flattened).filter(d => !d.children).map(d => {
                d.color = color(d.parentId)

                return d
            })

            return nodes
        },
    }
}

export default StackD3