// Your code here.
class DraggableCubes {
            constructor() {
                this.container = document.getElementById('container');
                this.cubes = document.querySelectorAll('.cube');
                this.isDragging = false;
                this.currentCube = null;
                this.startX = 0;
                this.startY = 0;
                this.initialX = 0;
                this.initialY = 0;
                this.containerRect = null;
                
                this.init();
            }

            init() {
                // Set initial positions in a grid
                this.setInitialPositions();
                
                // Add event listeners to each cube
                this.cubes.forEach(cube => {
                    cube.addEventListener('mousedown', this.handleMouseDown.bind(this));
                });

                // Add global event listeners
                document.addEventListener('mousemove', this.handleMouseMove.bind(this));
                document.addEventListener('mouseup', this.handleMouseUp.bind(this));
                
                // Update container rect on resize
                window.addEventListener('resize', this.updateContainerRect.bind(this));
                this.updateContainerRect();
            }

            setInitialPositions() {
                const cubesPerRow = 4;
                const cubeSize = 60;
                const spacing = 20;
                const startX = 50;
                const startY = 80;

                this.cubes.forEach((cube, index) => {
                    const row = Math.floor(index / cubesPerRow);
                    const col = index % cubesPerRow;
                    
                    const x = startX + col * (cubeSize + spacing);
                    const y = startY + row * (cubeSize + spacing);
                    
                    cube.style.left = x + 'px';
                    cube.style.top = y + 'px';
                });
            }

            updateContainerRect() {
                this.containerRect = this.container.getBoundingClientRect();
            }

            handleMouseDown(e) {
                e.preventDefault();
                
                this.isDragging = true;
                this.currentCube = e.target;
                this.currentCube.classList.add('dragging');
                
                // Get mouse position relative to page
                this.startX = e.pageX || e.clientX;
                this.startY = e.pageY || e.clientY;
                
                // Get cube's current position relative to container
                const cubeRect = this.currentCube.getBoundingClientRect();
                this.updateContainerRect();
                this.initialX = cubeRect.left - this.containerRect.left;
                this.initialY = cubeRect.top - this.containerRect.top;
            }

            handleMouseMove(e) {
                if (!this.isDragging || !this.currentCube) return;
                
                e.preventDefault();
                
                // Get current mouse position
                const currentX = e.pageX || e.clientX;
                const currentY = e.pageY || e.clientY;
                
                // Calculate movement delta
                const deltaX = currentX - this.startX;
                const deltaY = currentY - this.startY;
                
                // Calculate new position
                let newX = this.initialX + deltaX;
                let newY = this.initialY + deltaY;
                
                // Apply boundary constraints
                const cubeSize = 60;
                const containerWidth = this.container.clientWidth;
                const containerHeight = this.container.clientHeight;
                
                // Constrain to container boundaries
                newX = Math.max(0, Math.min(newX, containerWidth - cubeSize));
                newY = Math.max(0, Math.min(newY, containerHeight - cubeSize));
                
                // Update cube position
                this.currentCube.style.left = newX + 'px';
                this.currentCube.style.top = newY + 'px';
            }

            handleMouseUp(e) {
                if (!this.isDragging || !this.currentCube) return;
                
                this.isDragging = false;
                this.currentCube.classList.remove('dragging');
                this.currentCube = null;
            }

            reset() {
                this.setInitialPositions();
            }
        }

        // Initialize the draggable cubes system
        const draggableCubes = new DraggableCubes();

        // Reset function for the button
        function resetCubes() {
            draggableCubes.reset();
        }

        // Prevent default drag behavior on images and other elements
        document.addEventListener('dragstart', (e) => {
            e.preventDefault();
        });
