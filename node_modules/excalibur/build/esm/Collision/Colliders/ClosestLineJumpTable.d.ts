import { LineSegment } from '../../Math/line-segment';
import { PolygonCollider } from './PolygonCollider';
import { EdgeCollider } from './EdgeCollider';
import { CircleCollider } from './CircleCollider';
export declare const ClosestLineJumpTable: {
    PolygonPolygonClosestLine(polygonA: PolygonCollider, polygonB: PolygonCollider): LineSegment;
    PolygonEdgeClosestLine(polygon: PolygonCollider, edge: EdgeCollider): LineSegment;
    PolygonCircleClosestLine(polygon: PolygonCollider, circle: CircleCollider): LineSegment;
    CircleCircleClosestLine(circleA: CircleCollider, circleB: CircleCollider): LineSegment;
    CircleEdgeClosestLine(circle: CircleCollider, edge: EdgeCollider): LineSegment;
    EdgeEdgeClosestLine(edgeA: EdgeCollider, edgeB: EdgeCollider): LineSegment;
};
