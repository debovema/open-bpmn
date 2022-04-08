/********************************************************************************
 * Copyright (c) 2019 TypeFox and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/

/**
 * This module provides Anchor Computers for the BPMN Manhattan Router.
 * There are different IAnchorComputer for each kind of core BPMN element
 */
import { injectable } from 'inversify';
import {
	Bounds,
	Point,
	center,includes,almostEquals,
	ManhattanEdgeRouter,
	SConnectableElement,RectangleAnchor,PolylineEdgeRouter,
	IAnchorComputer
} from 'sprotty';

export const BPMN_ELEMENT_ANCHOR_KIND = 'bpmn-element';

/**
 * This BPMNElementAnchor computes a centered anchor point of the BPMN FlowElements
 * This AnchorType is based on the ManhattanEdgeRouter which is used in Open BPMN.
 * Event and Gateway elements provide 4 anchor points (north, each, south, west)
 * The Task element provides a series of grid anchor points dependign on the bounds ofs
 * the element.
 */
@injectable()
export class BPMNElementAnchor implements IAnchorComputer {

	static KIND = ManhattanEdgeRouter.KIND + ':' + BPMN_ELEMENT_ANCHOR_KIND;

	get kind(): string {
		return BPMNElementAnchor.KIND;
	}

    getAnchor(connectable: SConnectableElement, refPoint: Point, offset: number): Point {
		console.log('...bin in neuer BPMNElementAnchor methode..');
        const b = connectable.bounds;
        if (b.width <= 0 || b.height <= 0) {
            return b;
        }
        const bounds: Bounds = {
            x: b.x - offset,
            y: b.y - offset,
            width: b.width + 2 * offset,
            height: b.height + 2 * offset
        };
        if (refPoint.x >= bounds.x && bounds.x + bounds.width >= refPoint.x) {
            if (refPoint.y < bounds.y + 0.5 * bounds.height)
            return { x: refPoint.x, y: bounds.y };
            else
            return { x: refPoint.x, y: bounds.y + bounds.height };
        }
        if (refPoint.y >= bounds.y && bounds.y + bounds.height >= refPoint.y) {
            if (refPoint.x < bounds.x + 0.5 * bounds.width)
            return { x: bounds.x, y: refPoint.y };
            else
            return { x: bounds.x + bounds.width, y: refPoint.y };
        }
        return center(bounds);
    }
}

@injectable()
export class BPMNElementAnchorNew implements IAnchorComputer {

	static KIND = ManhattanEdgeRouter.KIND + ':' + BPMN_ELEMENT_ANCHOR_KIND;

	get kind(): string {
		return BPMNElementAnchorNew.KIND;
	}

	getAnchor(connectable: SConnectableElement, refPoint: Point, offset: number): Point {
		const b = connectable.bounds;
		if (b.width <= 0 || b.height <= 0) {
			return b;
		}

		const bounds: Bounds = {
			x: b.x - offset,
			y: b.y - offset,
			width: b.width + 2 * offset,
			height: b.height + 2 * offset
		};
		console.log('...BPMNElementAnchor refPoint= ' + refPoint.x + ',' + refPoint.y + ' bounds x=' + bounds.x + ' y=' + bounds.y + ' w=' + bounds.width + ' h=' + bounds.height);

		/*
		 * The refPoint is between west and east
		 */
		if (refPoint.x >= bounds.x && bounds.x + bounds.width >= refPoint.x) {
			if (refPoint.y < bounds.y + 0.5 * bounds.height) {
				// north
				return { x: bounds.x + 0.5 * bounds.width, y: bounds.y };
			}
			else {
				// south
				return { x: bounds.x + 0.5 * bounds.width, y: bounds.y + bounds.height };
			}
		}
		/*
		 * The refPoint is between north and south
		 */
		if (refPoint.y >= bounds.y && bounds.y + bounds.height >= refPoint.y) {
			if (refPoint.x < bounds.x + 0.5 * bounds.width) {
				// west
				return { x: bounds.x, y: bounds.y + 0.5 * bounds.height };
			}
			else {
				// east
				return { x: bounds.x + bounds.width, y: bounds.y + 0.5 * bounds.height };
			}
		}
		// default....
		console.warn('... -> default to center!');
		return center(bounds);
	}
}

@injectable()
export class BPMNPolylineElementAnchor implements IAnchorComputer {

	static readonly KIND = 'polyline';

    get kind(): string {
        return BPMNPolylineElementAnchor.KIND + ':' + BPMN_ELEMENT_ANCHOR_KIND;
    }

    /**
     * Compute an anchor position for routing an edge towards this element.
     *
     * The default implementation returns the element's center point. If edges should be connected
     * differently, e.g. to some point on the boundary of the element's view, the according computation
     * should be implemented in a subclass by overriding this method.
     *
     * @param connectable The node or port an edge should be connected to.
     * @param referencePoint The point from which the edge is routed towards this elemet, in the same
     *                       coordintae system as the connectable.
     * @param offset An optional offset value to be considered in the anchor computation;
     *               positive values should shift the anchor away from this element, negative values
     *               should shift the anchor more to the inside. Use this to adapt ot arrow heads.
     */
	getAnchor(connectable: SConnectableElement, refPoint: Point, offset: number): Point {
		const b = connectable.bounds;
		if (b.width <= 0 || b.height <= 0) {
			console.warn('... bounds width is <=0!!!');
			return b;
		}

		if (b.x === undefined || isNaN(b.x)) {
			return refPoint;
		}

		console.log(' bound b.x='+b.x);

		const bounds: Bounds = {
			x: b.x - offset,
			y: b.y - offset,
			width: b.width + 2 * offset,
			height: b.height + 2 * offset
		};

		if (isNaN(bounds.x )) {
			console.warn('... case 1');
			return refPoint;
		}

		console.log('...BPMNPolylineElementAnchor elementID=' + connectable.id + ' refPoint= ' + refPoint.x + ',' + refPoint.y + ' bounds x=' + bounds.x + ' y=' + bounds.y + ' w=' + bounds.width + ' h=' + bounds.height);

        /*
         * Checks whether the refPoint is included in the element bounds?
         * Than we return the center of the element
         */
        if (includes(bounds,refPoint)) {
			return center(bounds);
		}

		/*
		 * The refPoint is between west and east
		 */
		if (refPoint.x >= bounds.x && bounds.x + bounds.width >= refPoint.x) {
			if (refPoint.y < bounds.y + 0.5 * bounds.height) {
				// north
				return { x: bounds.x + 0.5 * bounds.width, y: bounds.y };
			}
			else {
				// south
				return { x: bounds.x + 0.5 * bounds.width, y: bounds.y + bounds.height };
			}
		}
		/*
		 * The refPoint is between north and south
		 */
		if (refPoint.y >= bounds.y && bounds.y + bounds.height >= refPoint.y) {
			if (refPoint.x < bounds.x + 0.5 * bounds.width) {
				// west
				return { x: bounds.x, y: bounds.y + 0.5 * bounds.height };
			}
			else {
				// east
				return { x: bounds.x + bounds.width, y: bounds.y + 0.5 * bounds.height };
			}
		}
		// default....
		console.warn('... -> default to center!');
		return center(bounds);
	}
}

@injectable()
export class BPMNPolylineElementAnchorNew extends  RectangleAnchor {

    get kind(): string {
        return PolylineEdgeRouter.KIND + ':' + BPMN_ELEMENT_ANCHOR_KIND;
    }

    getAnchor(connectable: SConnectableElement, refPoint: Point, offset: number): Point {
		console.log('...bin in neuer PolylineAnchor methode..');
        const bounds: any= connectable.bounds;
        const c: any = center(bounds);
        const finder = new NearestPointFinder(c, refPoint);
        if (!almostEquals(c.y, refPoint.y)) {
            const xTop = this.getXIntersection(bounds.y, c, refPoint);
            if (xTop >= bounds.x && xTop <= bounds.x + bounds.width)
                finder.addCandidate(xTop, bounds.y - offset);
            const xBottom = this.getXIntersection(bounds.y + bounds.height, c, refPoint);
            if (xBottom >= bounds.x && xBottom <= bounds.x + bounds.width)
                finder.addCandidate(xBottom, bounds.y + bounds.height + offset);
        }
        if (!almostEquals(c.x, refPoint.x)) {
            const yLeft = this.getYIntersection(bounds.x, c, refPoint);
            if (yLeft >= bounds.y && yLeft <= bounds.y + bounds.height)
                finder.addCandidate(bounds.x - offset, yLeft);
            const yRight = this.getYIntersection(bounds.x + bounds.width, c, refPoint);
            if (yRight >= bounds.y && yRight <= bounds.y + bounds.height)
                finder.addCandidate(bounds.x + bounds.width + offset, yRight);
        }
        return finder.best;
    }

    protected getXIntersection(yIntersection: number, centerPoint: Point, point: Point): number {
        const t = (yIntersection - centerPoint.y) / (point.y - centerPoint.y);
        return (point.x - centerPoint.x) * t + centerPoint.x;
    }

    protected getYIntersection(xIntersection: number, centerPoint: Point, point: Point): number {
        const t = (xIntersection - centerPoint.x) / (point.x - centerPoint.x);
        return (point.y - centerPoint.y) * t + centerPoint.y;
    }
}

class NearestPointFinder {
    protected currentBest: Point | undefined;
    protected currentDist: number;

    constructor(protected centerPoint: Point, protected refPoint: Point) {
    }

    addCandidate(x: number, y: number) {
        const dx = this.refPoint.x - x;
        const dy = this.refPoint.y - y;
        const dist = dx * dx + dy * dy;
        if (this.currentDist < 0 || dist < this.currentDist) {
            this.currentBest = {
                x: x,
                y: y
            };
            this.currentDist = dist;
        }
    }

    get best(): Point {
        if (this.currentBest === undefined)
            return this.centerPoint;
        else
            return this.currentBest;
    }
}

