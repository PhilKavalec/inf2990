import { SphereGeometry, MeshBasicMaterial, Mesh, Scene, Line, Geometry, LineBasicMaterial, Vector3} from "three";

const RED: number = 0xFF1101;
const BLUE: number = 0x0110FF;
const RADIUS: number = 8;
const VERTEX_GEOMETRY: SphereGeometry  = new SphereGeometry(RADIUS, RADIUS, RADIUS);
const SIMPLE_VERTEX_MATERIAL: MeshBasicMaterial = new MeshBasicMaterial ({color : RED});
const START_VERTEX_MATERIAL: MeshBasicMaterial = new MeshBasicMaterial ({color : 0xFF1493});
const LINE_MATERIAL: LineBasicMaterial = new LineBasicMaterial ({ color: BLUE });

export class TrackVertices {

    private vertices: Array<Mesh>;
    private connections: Array<Line>;
    private scene: Scene;
    private line: Line;
    private nbVertices: number;
    private firstVertex: Mesh;
    private lastVertex: Mesh;

    public constructor(scene: Scene) {
        this.scene = scene;
        this.vertices = new Array();
        this.connections = new Array();
        this.nbVertices = 0;
    }

    public addVertex(position: Vector3): void {
        const vertex: Mesh = (this.nbVertices === 0 ) ?
            new Mesh(VERTEX_GEOMETRY, START_VERTEX_MATERIAL) :
            new Mesh(VERTEX_GEOMETRY, SIMPLE_VERTEX_MATERIAL);
        vertex.position.set(position.x, position.y, 0);
        vertex.name = "vertex" + this.nbVertices;
        this.scene.add (vertex);
        this.vertices.push(vertex);
        if (this.nbVertices === 0 ) {
            this.firstVertex = vertex;
        }
        if (this.nbVertices > 0 ) {
            this.createConnection(this.vertices[this.nbVertices - 1], this.vertices[this.nbVertices]);
        }
        this.nbVertices++;
        this.lastVertex = vertex;
    }

    public removeLastVertex(): void {
        this.scene.remove(this.vertices.pop());
        this.scene.remove (this.connections.pop());
        this.nbVertices--;
    }

    public createConnection(start: Mesh , end: Mesh): void {
        const LINE_GEOMETRY: Geometry = new Geometry();
        LINE_GEOMETRY.vertices.push(new Vector3(start.position.x, start.position.y , 0));
        LINE_GEOMETRY.vertices.push(new Vector3(end.position.x, end.position.y , 0));
        this.line = new Line(LINE_GEOMETRY, LINE_MATERIAL);
        this.connections.push(this.line);
        this.scene.add(this.line);
    }

    public getFirstVertex(): Mesh {
        return this.firstVertex;
    }

    public getLastVertex(): Mesh {
        return this.lastVertex;
    }

    public getVertices(): Array<Mesh> {
        return this.vertices;
    }

    public isEmpty(): boolean {
        return (this.nbVertices === 0) ? true : false;
    }

    public setVertexPosition( vertexName: String, position: Vector3 ): void {
        // tslint:disable-next-line:prefer-const
        for (let entry of this.vertices) {
            if (entry.name === vertexName) {
                entry.position.x = position.x;
                entry.position.y = position.y;
            }
        }
    }

}
